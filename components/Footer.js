import React from 'react'

export default function Footer() {
  return (
    <div className='flex justify-center items-center gap-5 py-3 z-50'>
      <a href="https://dev.to/ozaharsh95">
        <i className="fa-brands fa-dev duration-300 hover:opacity-30 cursor-pointer"></i>
      </a>
      <a href='https://www.linkedin.com/in/harshoza955/'>
      <i className="fa-brands fa-linkedin duration-300 hover:opacity-30 cursor-pointer"></i>
      </a>
      <a href='https://github.com/ozaharsh95'>
      <i className="fa-brands fa-github-alt duration-300 hover:opacity-30 cursor-pointer"></i>
      </a>
    </div>
  )
}
