"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    let particlesArray: Particle[] = []

    // Calculate number of particles based on screen size
    const getParticleCount = () => {
      const baseCount = 70
      const areaFactor = (window.innerWidth * window.innerHeight) / (1920 * 1080)
      return Math.max(baseCount, Math.floor(baseCount * Math.sqrt(areaFactor) * 1.5))
    }

    // Calculate connection distance based on screen size
    const getConnectionDistance = () => {
      const baseDistance = 150
      const widthFactor = window.innerWidth / 1920
      return baseDistance * Math.max(1, Math.sqrt(widthFactor))
    }

    // Mouse position for interactive effects
    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150,
    }

    // Track mouse position
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Track scroll position
    let scrollY = window.scrollY
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
    )

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)

    // Handle resize to adjust particle count and distribution
    const handleResize = () => {
      setCanvasDimensions()

      // Recalculate document height
      const newDocumentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      )

      // Regenerate particles with new count and distribution
      particlesArray = generateParticles(getParticleCount(), newDocumentHeight)
    }

    window.addEventListener("resize", handleResize)

    class Particle {
      x: number
      y: number
      minSize: number
      maxSize: number
      size: number
      originalSize: number
      speedX: number
      speedY: number
      baseColor: string
      color: string
      baseY: number
      shineOffset: number
      shineIntensity: number
      shiningState: number // 0: normal, 1: shining, 2: fading
      shineStartTime: number
      shineDuration: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseY = y // Store original Y position

        // Random size range - more variation
        this.minSize = 0.5 + Math.random() * 1.5
        this.maxSize = this.minSize * (2 + Math.random() * 2) // 2-4x the min size
        this.originalSize = this.minSize
        this.size = this.originalSize

        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.2 - 0.1 // Slower vertical movement

        // Base color with varying opacity
        const baseOpacity = 0.3 + Math.random() * 0.3
        this.baseColor = `rgba(59, 130, 246, ${baseOpacity})`
        this.color = this.baseColor

        // Shine effect properties
        this.shineOffset = Math.random() * 6000 // Random offset so all particles don't shine at once
        this.shineIntensity = 0
        this.shiningState = 0
        this.shineStartTime = 0
        this.shineDuration = 6000 // 6 seconds total cycle
      }

      update(timestamp: number) {
        // Update position
        this.x += this.speedX
        this.y += this.speedY

        // Calculate the visible Y position based on scroll
        const visibleY = this.baseY - scrollY

        // Wrap around edges with buffer
        if (this.x > canvas.width + 100) this.x = -100
        if (this.x < -100) this.x = canvas.width + 100

        // For Y position, wrap within a range around the viewport
        const viewportBuffer = window.innerHeight * 2
        if (visibleY > window.innerHeight + viewportBuffer) {
          this.baseY -= documentHeight
        }
        if (visibleY < -viewportBuffer) {
          this.baseY += documentHeight
        }

        // Mouse interaction
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - this.x
          const dy = this.baseY - scrollY - mouse.y // Adjust for scroll
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            this.speedX -= dx * force * 0.01
            this.speedY -= dy * force * 0.01

            // Limit speed
            const maxSpeed = 2
            const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
            if (currentSpeed > maxSpeed) {
              this.speedX = (this.speedX / currentSpeed) * maxSpeed
              this.speedY = (this.speedY / currentSpeed) * maxSpeed
            }
          }
        }

        // Apply friction
        this.speedX *= 0.99
        this.speedY *= 0.99

        // Handle shining effect - 6 second cycle
        const cycleTime = (timestamp + this.shineOffset) % this.shineDuration
        const shineThreshold = this.shineDuration * 0.2 // 20% of cycle is shine up
        const fadeThreshold = this.shineDuration * 0.4 // 20% of cycle is shine down

        if (cycleTime < shineThreshold) {
          // Shine up phase
          this.shiningState = 1
          this.shineIntensity = cycleTime / shineThreshold
          this.size = this.originalSize + (this.maxSize - this.originalSize) * this.shineIntensity

          // Brighten color
          const opacity = 0.3 + Math.min(0.7, this.shineIntensity * 0.7)
          this.color = `rgba(59, 130, 246, ${opacity})`
        } else if (cycleTime < fadeThreshold) {
          // Shine down phase
          this.shiningState = 2
          this.shineIntensity = 1 - (cycleTime - shineThreshold) / (fadeThreshold - shineThreshold)
          this.size = this.originalSize + (this.maxSize - this.originalSize) * this.shineIntensity

          // Fade color back
          const opacity = 0.3 + Math.min(0.7, this.shineIntensity * 0.7)
          this.color = `rgba(59, 130, 246, ${opacity})`
        } else {
          // Normal phase
          this.shiningState = 0
          this.shineIntensity = 0
          this.size = this.originalSize
          this.color = this.baseColor
        }
      }

      draw() {
        const visibleY = this.baseY - scrollY

        // Draw the particle with current size and color
        ctx.beginPath()
        ctx.arc(this.x, visibleY, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Add glow effect when shining
        if (this.shineIntensity > 0) {
          const glowSize = this.size * (1 + this.shineIntensity)
          const gradient = ctx.createRadialGradient(this.x, visibleY, 0, this.x, visibleY, glowSize * 2)

          gradient.addColorStop(0, `rgba(59, 130, 246, ${0.3 * this.shineIntensity})`)
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

          ctx.beginPath()
          ctx.arc(this.x, visibleY, glowSize * 2, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }
    }

    // Generate particles distributed throughout the document
    const generateParticles = (count: number, docHeight: number) => {
      const particles = []

      for (let i = 0; i < count; i++) {
        // Distribute particles across the entire document height
        const x = Math.random() * window.innerWidth
        const y = Math.random() * docHeight
        particles.push(new Particle(x, y))
      }

      return particles
    }

    // Initialize particles
    particlesArray = generateParticles(getParticleCount(), documentHeight)

    const connectParticles = () => {
      const connectionDistance = getConnectionDistance()

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].baseY - scrollY - (particlesArray[b].baseY - scrollY)
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Smoother opacity transition
            const opacity = 1 - distance / connectionDistance

            // Enhance connection when either particle is shining
            const shineBoost = Math.max(particlesArray[a].shineIntensity, particlesArray[b].shineIntensity)

            // Draw connection line with enhanced opacity when shining
            const lineOpacity = opacity * (0.3 + shineBoost * 0.5)

            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineOpacity})`
            ctx.lineWidth = opacity * (1 + shineBoost * 1.5)
            ctx.moveTo(particlesArray[a].x, particlesArray[a].baseY - scrollY)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].baseY - scrollY)
            ctx.stroke()
          }
        }
      }
    }

    // Draw background with subtle upward flowing gradient
    const drawBackground = (timestamp: number) => {
      // Create a base dark background
      ctx.fillStyle = "rgba(9, 9, 11, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate wave parameters - extremely slow movement
      const waveSpeed = 0.00005 // Very slow speed
      const waveTime = timestamp * waveSpeed

      // Create multiple wave offsets for a more natural flow
      const wave1 = Math.sin(waveTime) * 0.1
      const wave2 = Math.cos(waveTime * 0.7) * 0.05
      const wave3 = Math.sin(waveTime * 0.5 + 1) * 0.07

      // Combined wave effect
      const waveOffset = wave1 + wave2 + wave3

      // Create a gradient that flows from bottom to top
      const gradientHeight = canvas.height * 1.5 // Extend beyond canvas for smoother transition

      // Adjust the gradient position based on the wave offset
      const gradientY = canvas.height + waveOffset * canvas.height * 0.2

      const gradient = ctx.createLinearGradient(
        0,
        gradientY, // Start at bottom with wave offset
        0,
        gradientY - gradientHeight, // End above the canvas
      )

      // Very subtle blue gradient
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.15)") // Subtle blue at bottom
      gradient.addColorStop(0.3, "rgba(59, 130, 246, 0.08)") // Fading as it rises
      gradient.addColorStop(0.7, "rgba(59, 130, 246, 0.03)") // Very faint near top
      gradient.addColorStop(1, "rgba(9, 9, 11, 0)") // Transparent at top

      // Apply the gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add a very subtle vignette effect to enhance depth
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7,
      )

      vignetteGradient.addColorStop(0, "rgba(9, 9, 11, 0)")
      vignetteGradient.addColorStop(0.7, "rgba(9, 9, 11, 0)")
      vignetteGradient.addColorStop(1, "rgba(9, 9, 11, 0.3)")

      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = (timestamp: number) => {
      // Clear canvas and draw background
      drawBackground(timestamp)

      // Update and draw particles
      particlesArray.forEach((particle) => {
        particle.update(timestamp)

        // Only draw particles that are within or close to the viewport
        const visibleY = particle.baseY - scrollY
        if (visibleY > -200 && visibleY < canvas.height + 200) {
          particle.draw()
        }
      })

      // Connect particles
      connectParticles()

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  )
}

