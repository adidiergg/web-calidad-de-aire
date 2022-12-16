import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from "../components/Login"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "unauthenticated") {
    return (

      <Login/>
  
    );
  }else if(status === "authenticated"){
    if(session.user.name==="gerente"){
      router.push("/gerente")
    }else if(session.user.name === "admin"){
      router.push("/administrador")
    }
  }

  
}
