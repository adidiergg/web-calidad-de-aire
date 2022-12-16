import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from "../components/Login"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

export default function Error() {
  return(
    <div>error de conexion</div>
  );

  
}
