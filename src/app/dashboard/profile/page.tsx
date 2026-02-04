"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { UserIcon, Camera, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loading } from "@/components/ui/Loading"

interface UserProfile {
  email: string
  lastLogin: string
  name?: string
  $createdAt?: string
  $id?: string
  prefs?: any
}

interface ProfileData {
  name: string
  email: string
  bio: string
  location: string
  website: string
  profilePicture: string
}

// Add this type for better type checking
interface AppwritePrefs {
  bio?: string
  location?: string
  website?: string
  profilePicture?: string
}

// Add this utility function for image compression
const compressImage = async (file: File, maxWidth: number = 200): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to WebP for better compression
        const compressedDataUrl = canvas.toDataURL('image/webp', 0.8);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const router = useRouter()

  // Profile state
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    profilePicture: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Regular user session (Prioritize real authentication)
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (user) {
          // If we have a real user, ensure guest mode is cleared
          localStorage.removeItem("guestSession")
          localStorage.removeItem("guestName")
          setIsGuest(false)

          // Get user profile
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          setUser({
            email: user.email || '',
            name: profile?.name || user.user_metadata?.name || '',
            lastLogin: user.last_sign_in_at || new Date().toISOString(),
            $createdAt: user.created_at,
            $id: user.id,
            prefs: profile || {}
          })
          
          // Load profile picture from localStorage if available
          const localProfilePic = localStorage.getItem(`profile_pic_${user.id}`)
          
          setProfileData({
            name: profile?.name || user.user_metadata?.name || "",
            email: user.email || "",
            bio: profile?.bio || "",
            location: profile?.location || "",
            website: profile?.website || "",
            profilePicture: localProfilePic || profile?.profile_picture || "",
          })
          setLoading(false)
          return
        }

        // Only check for guest session if no real user is found
        const guestSession = localStorage.getItem("guestSession")
        if (guestSession === "true") {
          setIsGuest(true)
          setUser({
            name: "Guest User",
            email: "guest@example.com",
            $createdAt: new Date().toISOString(),
            $id: "guest",
            lastLogin: new Date().toISOString()
          })
          setProfileData({
            name: "Guest User",
            email: "guest@example.com",
            bio: "",
            location: "",
            website: "",
            profilePicture: "",
          })
          setLoading(false)
          return
        }
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  // Modified profile picture handling
  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image must be less than 5MB");
      }

      if (!file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file");
      }

      // Show loading state
      setProfileLoading(true);

      // Compress image
      const compressedImage = await compressImage(file);

      // Update state with preview
      setProfileData(prev => ({
        ...prev,
        profilePicture: compressedImage
      }));

      // Save to localStorage for persistence
      if (user?.$id) {
        localStorage.setItem(`profile_pic_${user.$id}`, compressedImage);
      }

      // Update Supabase profile
      if (user?.$id) {
        await supabase
          .from('user_profiles')
          .upsert({
            id: user.$id,
            profile_picture: compressedImage
          })
      }

      setMessage("Profile picture updated successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error uploading image");
      setMessageType("error");
    } finally {
      setProfileLoading(false);
      clearMessage();
    }
  };

  // Modified handleProfileUpdate function
  const handleProfileUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isGuest) {
      setMessage("Profile updates are not available for guest users");
      setMessageType("error");
      clearMessage();
      return;
    }

    setProfileLoading(true);
    try {
      if (!user?.$id) throw new Error("User not found")

      // Update email if changed (Supabase auth)
      if (profileData.email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: profileData.email
        })
        if (emailError) throw emailError
      }

      // Update user profile in Supabase
      const { data: updatedProfile, error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.$id,
          name: profileData.name,
          bio: profileData.bio || "",
          location: profileData.location || "",
          website: profileData.website || "",
          profile_picture: profileData.profilePicture || null
        })
        .select()
        .single()

      if (profileError) throw profileError

      // Refresh user data
      const { data: { user: updatedUser } } = await supabase.auth.getUser()
      if (updatedUser) {
        setUser({
          email: updatedUser.email || '',
          name: updatedProfile?.name || updatedUser.user_metadata?.name || '',
          lastLogin: updatedUser.last_sign_in_at || new Date().toISOString(),
          $createdAt: updatedUser.created_at,
          $id: updatedUser.id,
          prefs: updatedProfile || {}
        })
      }

      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch (error: any) {
      console.error("Profile update error:", error);
      setMessage(error.message || "Error updating profile");
      setMessageType("error");
    } finally {
      setProfileLoading(false);
      clearMessage();
    }
  };

  // Brutalist Profile Picture
  const ProfilePicture = ({ src, name, isLoading }: { src: string; name: string; isLoading: boolean }) => (
    <div className="relative group">
      <div className="w-32 h-32 bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 flex items-center justify-center z-10 transition-colors">
            <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent animate-spin" />
          </div>
        ) : src ? (
          <img
            src={src}
            alt="Profile"
            className="w-full h-full transition-all duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "";
              e.currentTarget.classList.add("hidden");
            }}
          />
        ) : (
          <span className="text-4xl font-boldonse text-zinc-400 dark:text-zinc-700">
            {name?.[0]?.toUpperCase() || "U"}
          </span>
        )}
        
        {/* Tech Overlays */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pink-500/50" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-pink-500/50" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-pink-500/50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-pink-500/50" />
        
        {/* Scan line */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
      </div>

      {!isGuest && (
        <label className="absolute -bottom-3 -right-3 cursor-pointer group/btn">
           <div className="h-8 w-8 bg-pink-500 hover:bg-pink-400 flex items-center justify-center transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border border-zinc-900 dark:border-black">
              <Camera className="w-4 h-4 text-white" />
           </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="hidden"
            disabled={profileLoading}
          />
        </label>
      )}
    </div>
  );

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("")
      setMessageType("")
    }, 5000)
  }

  if (loading) {
    return <Loading message="INITIALIZING USER DATA..." />
  }

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 font-mono text-zinc-600 dark:text-zinc-300 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pink-500 animate-pulse" />
              <span className="text-xs text-pink-500 uppercase tracking-widest">User Configuration</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-boldonse text-zinc-900 dark:text-white uppercase tracking-tight">
              Profile <span className="text-zinc-400 dark:text-zinc-600">Manifest</span>
           </h1>
           <p className="text-zinc-500 mt-2 max-w-xl">
             Manage your digital identity and system preferences.
             {!isGuest ? (
               <span className="text-emerald-600 dark:text-emerald-500 ml-2">{'//'} ACCESS GRANTED</span>
             ) : (
               <span className="text-amber-600 dark:text-amber-500 ml-2">{'//'} GUEST MODE RESTRICTED</span>
             )}
           </p>
        </div>

        {!isGuest && (
          <Button
            onClick={handleProfileUpdate}
            disabled={profileLoading}
            className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-black rounded-none border-2 border-transparent hover:border-pink-500 transition-all min-w-[180px] h-12 uppercase font-bold tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
          >
             {profileLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
                  <span>Writing...</span>
                </div>
             ) : (
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Save Config</span>
                </div>
             )}
          </Button>
        )}
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className={cn(
              "border-l-4 p-4 mb-8 font-mono text-sm flex items-center gap-3 transition-colors",
              messageType === "success" 
                ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" 
                : "border-red-500 bg-red-500/5 dark:bg-red-500/10 text-red-700 dark:text-red-400"
            )}>
              {messageType === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="uppercase tracking-wide font-bold">
                {messageType === "success" ? "System Update Successful: " : "System Error: "}
                {message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isGuest && (
         <div className="border border-amber-500/20 dark:border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-4 transition-colors">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div>
               <h3 className="text-amber-700 dark:text-amber-500 font-bold uppercase tracking-wider text-sm mb-1">Guest Mode Active</h3>
               <p className="text-amber-800/70 dark:text-amber-500/80 text-xs">Profile persistence protocols are disabled. Data will strictly expire upon session termination.</p>
            </div>
         </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col - Identity */}
        <div className="lg:col-span-4 space-y-8">
           {/* Profile Card */}
           <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-sm transition-colors">
              <div className="absolute top-0 right-0 p-2 opacity-10 dark:opacity-50 transition-opacity">
                 <UserIcon className="w-12 h-12 text-zinc-900 dark:text-zinc-900" />
              </div>
              
              <ProfilePicture
                 src={profileData.profilePicture}
                 name={profileData.name}
                 isLoading={profileLoading}
              />

              <div className="mt-6 w-full space-y-4">
                 <div>
                    <h2 className="text-xl font-boldonse text-zinc-900 dark:text-white uppercase tracking-wider truncate">
                       {profileData.name || "Unknown_User"}
                    </h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1 truncate">
                       {profileData.email}
                    </p>
                 </div>

                 <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 w-full grid grid-cols-2 gap-4 transition-colors">
                     <div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase mb-1">Status</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-500 font-bold flex items-center justify-center gap-1">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                           ACTIVE
                        </div>
                     </div>
                     <div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase mb-1">Role</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-300 font-bold uppercase">
                           {isGuest ? "GUEST" : "USER"}
                        </div>
                     </div>
                 </div>
              </div>
           </div>

           {/* Account Meta */}
           <div className="bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 transition-colors shadow-sm">
              <h3 className="text-sm font-boldonse text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">Metadata</h3>
              <div className="space-y-3 text-xs">
                 <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-600 font-medium">ID_HASH</span>
                    <span className="font-mono text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950 px-2 py-1 border border-zinc-200 dark:border-zinc-800 transition-colors">
                       {user?.$id?.slice(0, 8) || "N/A"}
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-600 font-medium">CREATED_AT</span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                       {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : "N/A"}
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-600 font-medium">LAST_LOGIN</span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                       {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "N/A"}
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Col - Form */}
        <div className="lg:col-span-8">
           <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 relative shadow-sm transition-colors">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-300 dark:border-zinc-600 transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-300 dark:border-zinc-600 transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-300 dark:border-zinc-600 transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-300 dark:border-zinc-600 transition-colors" />

              <h3 className="text-lg font-boldonse text-zinc-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                 <span className="w-1 h-6 bg-pink-500" />
                 User Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <div className="space-y-2">
                    <Label className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Display Name</Label>
                    <Input
                       value={profileData.name}
                       onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                       className="bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 focus:border-pink-500 text-zinc-900 dark:text-white font-mono rounded-none h-12 transition-colors"
                       placeholder="ENTER_NAME"
                       disabled={isGuest || profileLoading}
                    />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Email Address</Label>
                    <Input
                       value={profileData.email}
                       onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                       className="bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 focus:border-pink-500 text-zinc-900 dark:text-white font-mono rounded-none h-12 transition-colors"
                       placeholder="ENTER_EMAIL"
                       disabled={isGuest || profileLoading}
                    />
                 </div>
              </div>

              <div className="space-y-2 mb-8">
                 <Label className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Bio / Mission</Label>
                 <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 focus:border-pink-500 text-zinc-900 dark:text-white font-mono rounded-none min-h-[120px] resize-none transition-colors"
                    placeholder="DEFINE_USER_OBJECTIVE..."
                    disabled={isGuest || profileLoading}
                    maxLength={500}
                 />
                 <div className="text-right text-[10px] text-zinc-400 dark:text-zinc-600 uppercase font-bold">
                    {profileData.bio.length} / 500 CHARS
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <Label className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Location Node</Label>
                    <Input
                       value={profileData.location}
                       onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                       className="bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 focus:border-pink-500 text-zinc-900 dark:text-white font-mono rounded-none h-12 transition-colors"
                       placeholder="CITY_COUNTRY"
                       disabled={isGuest || profileLoading}
                    />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">External Uplink</Label>
                    <Input
                       value={profileData.website}
                       onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                       className="bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 focus:border-pink-500 text-zinc-900 dark:text-white font-mono rounded-none h-12 transition-colors"
                       placeholder="HTTPS://"
                       disabled={isGuest || profileLoading}
                    />
                 </div>
              </div>

              {/* Decorative Background Grid */}
              <div className="absolute inset-x-4 bottom-4 h-px bg-zinc-100 dark:bg-zinc-900 transition-colors" />
              <div className="absolute inset-y-4 right-4 w-px bg-zinc-100 dark:bg-zinc-900 transition-colors" />
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage