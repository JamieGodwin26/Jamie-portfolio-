'use client'

import { motion, type Variants } from 'framer-motion'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/* ─── Variant maps: defined outside components to be stable references ─── */

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/* ─── Stable motion element map: avoids motion.create() inside render ─── */

const MotionDiv     = motion.div
const MotionUl      = motion.ul
const MotionOl      = motion.ol
const MotionSection = motion.section

const MotionLi      = motion.li
const MotionArticle = motion.article

/* ─── StaggerGroup ─── */

type GroupTag = 'div' | 'ul' | 'ol' | 'section'

interface StaggerGroupProps extends HTMLAttributes<HTMLElement> {
  as?: GroupTag
  stagger?: number
  once?: boolean
}

const groupTagMap = {
  div:     MotionDiv,
  ul:      MotionUl,
  ol:      MotionOl,
  section: MotionSection,
} as const

export function StaggerGroup({
  as = 'div',
  stagger = 0.08,
  once = true,
  className,
  children,
  ...rest
}: StaggerGroupProps) {
  const Tag = groupTagMap[as]
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  }

  return (
    <Tag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-64px 0px' }}
      className={cn(className)}
      {...(rest as object)}
    >
      {children}
    </Tag>
  )
}

/* ─── StaggerItem ─── */

type ItemTag = 'div' | 'li' | 'article'

interface StaggerItemProps extends HTMLAttributes<HTMLElement> {
  as?: ItemTag
}

const itemTagMap = {
  div:     MotionDiv,
  li:      MotionLi,
  article: MotionArticle,
} as const

export function StaggerItem({
  as = 'div',
  className,
  children,
  ...rest
}: StaggerItemProps) {
  const Tag = itemTagMap[as]

  return (
    <Tag variants={staggerItemVariants} className={cn(className)} {...(rest as object)}>
      {children}
    </Tag>
  )
}
