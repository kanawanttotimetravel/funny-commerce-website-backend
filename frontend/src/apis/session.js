import {cookies} from "next/headers";
import 'dotenv/config'
import {SignJWT, jwtVerify} from "jose";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export const encrypt = async (payload) => {
  return new SignJWT(payload)
  .setProtectedHeader({alg: 'HS256'})
  .setIssuedAt()
  .setExpirationTime('7d')
  .sign(encodedKey)
}

export async function decrypt(session) {
  try {
    const {payload} = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export const createSession = async (userId) => {
  const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({userId, expireAt})
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expireAt,
    sameSite: 'lax',
    path: '/',
  })
}
export const deleteSession = async () => {
  cookies().delete('session')
}

export const getSession = async () => {
  const session = cookies().get('session')?.value
  if (!session) {
    return null
  }
  return await decrypt(session)
}
