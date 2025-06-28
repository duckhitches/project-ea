"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { account } from "@/lib/appwrite"
import { UserIcon, Camera, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Loading from "../loading"

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
        // Check if it's a guest session first
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

        // Regular user session
        const currentUser = await account.get()
        setUser(currentUser)
        
        // Load profile picture from localStorage if available
        const localProfilePic = localStorage.getItem(`profile_pic_${currentUser.$id}`)
        
        setProfileData({
          name: currentUser.name || "",
          email: currentUser.email || "",
          bio: currentUser.prefs?.bio || "",
          location: currentUser.prefs?.location || "",
          website: currentUser.prefs?.website || "",
          profilePicture: localProfilePic || currentUser.prefs?.profilePicture || "",
        })
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

      // Update Appwrite prefs
      const currentPrefs = user?.prefs || {};
      await account.updatePrefs({
        ...currentPrefs,
        profilePicture: compressedImage
      });

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
      // Update name if changed
      if (profileData.name !== user?.name) {
        await account.updateName(profileData.name);
      }

      // Update email if changed
      if (profileData.email !== user?.email) {
        await account.updateEmail(profileData.email, profileData.email);
      }

      // Get current preferences
      const currentPrefs = user?.prefs || {};

      // Update preferences
      const updatedPrefs: AppwritePrefs = {
        ...currentPrefs,
        bio: profileData.bio || "",
        location: profileData.location || "",
        website: profileData.website || "",
        // Keep existing profile picture if not changed
        profilePicture: profileData.profilePicture || currentPrefs.profilePicture
      };

      await account.updatePrefs(updatedPrefs);

      // Refresh user data
      const updatedUser = await account.get();
      setUser(updatedUser);

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

  // Modified profile picture component
  const ProfilePicture = ({ src, name, isLoading }: { src: string; name: string; isLoading: boolean }) => (
    <div className="relative">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {isLoading ? (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : src ? (
          <img
            src={src}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = ""; // Clear broken image
              e.currentTarget.classList.add("hidden");
            }}
          />
        ) : (
          <span className="text-2xl font-semibold text-gray-400">
            {name?.[0]?.toUpperCase() || "U"}
          </span>
        )}
      </div>
      {!isGuest && (
        <label className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-all duration-200 shadow-lg">
          <Camera className="w-4 h-4 text-white" />
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

  // Smooth Page Loading Animation
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  if (loading) {
    return <Loading message="Loading your profile..." />
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="max-w-4xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <motion.div 
        variants={pageVariants}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        </div>
        {!isGuest && (
          <Button
            onClick={handleProfileUpdate}
            disabled={profileLoading}
            className="relative overflow-hidden bg-black hover:bg-gray-900 text-white px-6 h-10 rounded-full transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              {profileLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black"
                >
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{
                          y: ["0%", "-50%", "0%"],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Save Changes
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        )}
      </motion.div>

      {/* Alerts */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Alert 
              className={cn(
                "border rounded-lg shadow-sm",
                messageType === "success" 
                  ? "border-green-100 bg-green-50" 
                  : "border-red-100 bg-red-50"
              )}
            >
              {messageType === "success" ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <AlertDescription className={cn(
                "text-sm font-medium",
                messageType === "success" ? "text-green-800" : "text-red-800"
              )}>
                {message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guest Warning */}
      {isGuest && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="border-yellow-100 bg-yellow-50">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <AlertDescription className="text-yellow-800">
              You are using a guest account. Sign up to save your profile information!
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Profile Picture Section */}
      <motion.div
        variants={pageVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center gap-6">
          <ProfilePicture
            src={profileData.profilePicture}
            name={profileData.name}
            isLoading={profileLoading}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {profileData.name || "Your Name"}
            </h2>
            <p className="text-gray-500 text-sm">{profileData.email}</p>
            {!isGuest && (
              <p className="text-xs text-gray-400 mt-1">
                Click the camera icon to update your profile picture
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Personal Information Form */}
      <motion.div
        variants={pageVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg"
              disabled={isGuest || profileLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg"
              disabled={isGuest || profileLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Bio</Label>
          <Textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            className="min-h-[120px] border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg resize-none"
            disabled={isGuest || profileLoading}
            maxLength={500}
          />
          <p className="text-xs text-gray-500">{profileData.bio.length}/500 characters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Location</Label>
            <Input
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg"
              disabled={isGuest || profileLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Website</Label>
            <Input
              value={profileData.website}
              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg"
              disabled={isGuest || profileLoading}
            />
          </div>
        </div>
      </motion.div>

      {/* Account Information */}
      <motion.div
        variants={pageVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Account Type</span>
            <Badge variant="outline" className={cn(
              "font-medium",
              isGuest ? "text-yellow-600" : "text-green-600"
            )}>
              {isGuest ? "Guest Account" : "Full Member"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Member Since</span>
            <span className="text-sm font-medium text-gray-900">
              {new Date(user?.$createdAt || "").toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-600">User ID</span>
            <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
              {user?.$id?.slice(0, 8)}...
            </code>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProfilePage