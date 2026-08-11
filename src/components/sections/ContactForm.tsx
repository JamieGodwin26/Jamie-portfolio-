'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClasses =
  'border-b border-border bg-transparent py-2 font-sans text-lg text-ink placeholder:text-ink-faint transition-colors duration-150 focus:border-ink focus:outline-none disabled:opacity-50'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          company: formData.get('company'), // honeypot
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-2">
        <p className="font-sans text-2xl font-medium tracking-tight text-ink">Message sent.</p>
        <p className="max-w-[48ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
          Thanks for reaching out. I&rsquo;ll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Honeypot — hidden from real visitors, catches basic bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-label text-ink-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={status === 'submitting'}
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-label text-ink-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === 'submitting'}
          placeholder="you@email.com"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-label text-ink-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={status === 'submitting'}
          placeholder="What are you working on?"
          className={`resize-none ${inputClasses}`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-meta text-accent-text">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="text-label w-fit rounded-[var(--radius-pill)] border border-border-strong px-5 py-2.5 text-ink transition-colors duration-150 hover:border-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
