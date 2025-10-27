import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {useParams, useNavigate} from "react-router-dom"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {PasswordFormSchema} from "./Schema"

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      id
    }
  }
`

const ResetPasswordForm = () => {
  const {token} = useParams()
  const navigate = useNavigate()
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION)

  const form = useForm({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async values => {
    try {
      await resetPassword({variables: {token, password: values.password}})
      toast.success("Password reset successfully")
      navigate("/login")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-100 border-black border-2 rounded-lg p-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Change Your Password
              </FormLabel>
              <FormDescription>
                For maximum security, always avoid common, predictable
                passwords.
              </FormDescription>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="float-end" type="submit">
          Reset
        </Button>
      </form>
    </Form>
  )
}
export default ResetPasswordForm
