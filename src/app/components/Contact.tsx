"use client"

import Link from "next/link"

const developerTeam = [
  {
    name: "Web Developer & DevOps Specialist",
    role: "Full Stack Development & Testing",
    description: "Expert in modern web technologies, cloud infrastructure, and deployment automation.",
    skills: [
      "React, Next.js, TypeScript, Framer Motion and more",
      "Node.js, Python, Go",
      "AWS, Docker, Azure, Google Cloud, Vercel and more",
      "CI/CD, Infrastructure as Code",
      "Database, UI/UX Design & Optimization",
    ],
    avatar: "/profileeshan.jpg?height=80&width=80",
    href: "mailto:shettennavareshan@gmail.com",
  },
  {
    name: "AI/ML Specialist",
    role: "Artificial Intelligence",
    description: "Specialized in machine learning, deep learning, and AI-powered applications.",
    skills: [
      "Machine Learning & Deep Learning",
      "Python, TensorFlow, PyTorch",
      "Natural Language Processing, Computer Vision, and more",
      "AI Model Deployment, Optimization, and more",
    ],
    avatar: "/profilearyan.jpg?height=80&width=80",
    href: "mailto:aaryangowda006@gmail.com",
  },
]

const eaTeam = {
  name: "EA Team",
  role: "Executive Assistant",
  description: "Professional support team for business operations, scheduling, and administrative tasks.",
  services: [
    "Executive Support & Scheduling",
    "Project Coordination",
    "Client Communication",
    "Administrative Operations",
    "Business Process Management",
  ],
  avatar: "/EA.ai.svg?height=80&width=80",
  href: "mailto:duckhitches@outlook.com",
}

const contactMethods = [
  {
    name: "Email",
    value: "justnording@gmail.com",
    href: "mailto:justnord@gmail.com",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
//   {
//     name: "WhatsApp",
//     value: "+91 9826000000",
//     href: "https://wa.me/918792190189",
//     icon: (
//       <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
//       </svg>
//     ),
//   },
  {
    name: "LinkedIn",
    value: "Eshan Shettennavar",
    href: "https://linkedin.com/in/eshan-shettennavar/",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center justify-center">
      {/* Header with back link and title - Same as pricing */}
      <div className="w-full mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-0">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg">Go Back</span>
          </Link>
          <h2 className="text-4xl font-bold text-center sm:text-right">Contact Us</h2>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>

      {/* Contact Methods */}
      <div className="mb-12 w-full">
        <h3 className="text-2xl font-medium text-center mb-6">Get In Touch</h3>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors rounded-lg p-4 border border-gray-300 dark:border-neutral-700"
            >
              <div className="text-blue-600 dark:text-blue-400">{method.icon}</div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{method.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{method.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Developer Section */}
      <div className="mb-12 w-full">
        <h3 className="text-2xl font-medium text-center mb-6">Developer Team</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {developerTeam.map((developer) => (
            <div
              key={developer.name}
              className="rounded-lg border border-gray-300 dark:border-neutral-700 p-6 shadow-sm bg-gray-50 dark:bg-neutral-800 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <img
                  src={developer.avatar || "/placeholder.svg"}
                  alt={developer.name}
                  className="w-16 h-16 rounded-full mr-4 bg-gray-200 dark:bg-neutral-700"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{developer.name}</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{developer.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{developer.description}</p>
              <div className="flex-1">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Expertise:</h5>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  {developer.skills.map((skill, i) => (
                    <li key={i}>• {skill}</li>
                  ))}
                </ul>
              </div>
              <button onClick={() => window.open(`mailto:${developer.href}`, '_blank')} className="mt-6 bg-black hover:text-amber-200 text-white py-2 px-4 rounded transition-colors">
                Contact Developer
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EA Team Section */}
      <div className="w-full">
        <h3 className="text-2xl font-medium text-center mb-6">Executive Assistant Team</h3>
        <div className="max-w-md mx-auto">
          <div className="rounded-lg border border-gray-300 dark:border-neutral-700 p-6 shadow-sm bg-gray-50 dark:bg-neutral-800 flex flex-col">
            <div className="flex items-center mb-4">
              <img
                src={eaTeam.avatar || "/placeholder.svg"}
                alt={eaTeam.name}
                className="w-16 h-16 rounded-full mr-4 bg-gray-200 dark:bg-neutral-700"
              />
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{eaTeam.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{eaTeam.role}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{eaTeam.description}</p>
            <div className="flex-1">
              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Services:</h5>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 mb-6">
                {eaTeam.services.map((service, i) => (
                  <li key={i}>• {service}</li>
                ))}
              </ul>
            </div>
            <button className="mt-auto bg-black hover:text-amber-200 text-white py-2 px-4 rounded transition-colors">
              Contact EA Team
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
