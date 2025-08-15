import React from 'react'

const About = () => {
  return (
    <div className='bg-black w-full h-screen'>
      <div className='w-[70%] mx-auto p-10'>
        <div className='text-center border-b-1 border-b-gray-400 p-5'>
          <h1 className='text-white text-3xl font-bold'>DevNotes</h1>
          <p className='text-gray-400'>Your Notes Are Secured On The Cloud</p>
        </div>
        <div className='text-white font-semibold text-center p-10'>
          <ul className='text-lg flex flex-col gap-3'>
            <li>DevNotes is a cloud based Notes app build to store user's notes anytime, anywhere on the cloud with easy access to their notes.</li>
            <li>The App is build using the popular technologies like React JS MongoDB, Express Js and NodeJS.</li>
            <li>Tailwind is Used as the CSS Framework for styling the App.</li>
            <li>shadcn-ui is used as the component library for the App with radix-ui.</li>
            <li>The App is completely TypeSafe with Typescript.</li>
            <li>ALl the forms are completely typeSafe with ZOD and react-hook-form.</li>
            <li>Vite JS is used as the bundler</li>
            <li>For fetching the notes of the logged in user Custom Express APIs are used.</li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default About