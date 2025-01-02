import UserTag from "../userData/userdata.jsx";


function Header() {
  return (
    <header className='w-full bg-blue-500 flex h-[100px] relative items-center p-[20px]'>
      <h1 className='text-white text-[30px]'>  Leonine Villa</h1>
      <UserTag imageLink= "https://www.w3schools.com/howto/img_avatar.png" name= "Kasuni Madeesha"/>
    </header>
  )
}

export default Header;