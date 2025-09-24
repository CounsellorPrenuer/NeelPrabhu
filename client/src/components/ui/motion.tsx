"use client"

import { motion, type Variants, MotionProps } from "framer-motion"
import { forwardRef } from "react"

// Motion variants for common animations
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

// Enhanced motion components
interface MotionSectionProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
}

export const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  ({ children, className, variants = fadeInUp, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.section>
    )
  }
)

MotionSection.displayName = "MotionSection"

export const MotionDiv = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, variants = fadeInUp, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

MotionDiv.displayName = "MotionDiv"

export const MotionCard = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, variants = cardHover, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

MotionCard.displayName = "MotionCard"

interface MotionStaggerProps extends MotionProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
}

export const MotionStagger = forwardRef<HTMLDivElement, MotionStaggerProps>(
  ({ children, className, stagger = 0.1, delay = 0.1, ...props }, ref) => {
    const staggerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

MotionStagger.displayName = "MotionStagger"

// Button with hover effects
interface MotionButtonProps extends MotionProps {
  children: React.ReactNode
  className?: string
  whileHover?: any
  whileTap?: any
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className, whileHover, whileTap, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
          ...whileHover,
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 },
          ...whileTap,
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

MotionButton.displayName = "MotionButton"

// Hero parallax component
export const ParallaxElement = motion.div