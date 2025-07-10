import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [isnumber, setIsnumber] = useState(false)
  const [ischaracter, setIscharacter] = useState(false)
  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isnumber) str+= "0123456789"
    if (ischaracter) str+= "!@#$%^&*()_-+=[]{}~?"
    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, isnumber, ischaracter, setPassword])

  const copytoclipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 101)
  window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordgenerator()
  }, [length, isnumber, ischaracter, setPassword])

  return (
    <div className='flex flex-col justify-center mt-14 bg-blue-950 w-1/2 mr-auto ml-auto rounded-2xl'>
      <h1 className='text-white mt-7 text-3xl flex justify-center'>Password Generator</h1>
      <div className='flex justify-center m-11'>
        <input type="text" className='bg-white px-2 py-4 w-2xl rounded-l-xl text-red-600 text-2xl outline-none' placeholder='Password' 
        readOnly value={password} ref={passwordRef}
        />
        <button className='text-white px-10 py-4 bg-blue-600 rounded-r-xl text-2xl' onClick={copytoclipboard}>copy</button>
      </div>

      <div className='flex justify-around mb-8'>
        <label className='flex'>
          <input type="range" min={8} max={100} className='mr-2' value={length} onChange={(e) => setLength(e.target.value)}/>
          <h5 className='text-orange-400 text-xl'>Length ({length})</h5>
        </label>

        <label className='flex'>
          <input type="checkbox" className='mr-2' onChange={() => setIsnumber(!isnumber)}/>
          <h5 className='text-orange-400 text-xl'>Numbers</h5>
        </label>

        <label className='flex'>
          <input type="checkbox" className='mr-2' onChange={() => setIscharacter(!ischaracter)}/>
          <h5 className='text-orange-400 text-xl'>Characters</h5>
        </label>
      </div>
    </div>
  )
}

export default App
