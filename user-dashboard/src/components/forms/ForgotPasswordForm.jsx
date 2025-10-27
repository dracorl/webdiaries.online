import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {EmailFormSchema} from "./Schema"

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotToken($email: String!) {
    forgotToken(email: $email)
  }
`

const ForgotPasswordForm = () => {
  const [forgotToken] = useMutation(FORGOT_PASSWORD_MUTATION)

  const form = useForm({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async values => {
    try {
      await forgotToken({variables: {email: values.email}})
      toast.success("Email sent. Check your inbox.")
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
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Forgot Password
              </FormLabel>
              <FormDescription>
                Enter your email address and we will send you a link to reset
                your password.
              </FormDescription>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right">
          Send
        </Button>
      </form>
    </Form>
  )
}
export default ForgotPasswordForm
