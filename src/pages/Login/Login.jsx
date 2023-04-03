import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styles from './Login.module.scss'
import { checkIsAuth, loginPharmacy } from '../../redux/features/pharmacySlice'

export const Login = () => {
  const [pharmacyName, setPharmacyName] = useState('')
  const [password, setPassword] = useState('')

  const { status } = useSelector((state) => state.pharmacy)
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(loginPharmacy({ pharmacyName, password }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
    >
      <h1>Авторизация</h1>
      <label>
        Username:
        <input
          type='text'
          value={pharmacyName}
          onChange={(e) => setPharmacyName(e.target.value)}
          placeholder='Pharmacy'
        />
      </label>

      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </label>

      <div className={styles.divBtns}>
        <button
          type='submit'
          onClick={handleSubmit}
          className={styles.login}
        >
          Войти
        </button>
        
        <Link className={styles.link}
          to='/register'
        >
          Нет аккаунта ?
        </Link>
      </div>
    </form>
  )
}