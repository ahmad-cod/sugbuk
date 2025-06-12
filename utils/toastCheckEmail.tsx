import toast from 'react-hot-toast'

export function toastCheckEmail(email: string) {
  const domain = email.split('@')[1]

  const providerUrl = (() => {
    if (domain === 'gmail.com') return 'https://mail.google.com'
    if (domain === 'yahoo.com') return 'https://mail.yahoo.com'
    if (domain === 'outlook.com' || domain === 'hotmail.com') return 'https://outlook.live.com'
    if (domain === 'icloud.com') return 'https://www.icloud.com/mail'
    return 'https://mail.google.com' // fallback
  })()

  toast((t) => (
    <span>
      Check your email to verify your account.
      <button
        onClick={() => {
          window.open(providerUrl, '_blank')
          toast.dismiss(t.id)
        }}
        style={{
          marginLeft: '8px',
          color: '#2563eb',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Open Email
      </button>
    </span>
  ))
}
