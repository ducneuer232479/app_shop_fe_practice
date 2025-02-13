// ** React
import { ReactNode } from 'react'

// ** Next
import { NextPage } from 'next'

// ** Views
import RegisterPage from 'src/views/pages/register'
import BlankLayout from 'src/views/layouts/BlankLayout'

type TProps = {}

const Register: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default Register

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
