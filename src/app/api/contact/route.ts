import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CONTACT_EMAIL } from '@/lib/metadata'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  /* Honeypot: real visitors never see or fill this field, bots that
     auto-fill every input do — silently accept without sending. */
  if (typeof body?.company === 'string' && body.company.length > 0) {
    return NextResponse.json({ ok: true })
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form: RESEND_API_KEY is not set.')
    return NextResponse.json({ error: 'Could not send your message. Please try again later.' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>`,
    })

    if (error) {
      console.error('Contact form send failed:', error)
      return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form send failed:', error)
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 })
  }
}
