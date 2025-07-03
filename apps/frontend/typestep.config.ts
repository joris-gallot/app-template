import type { TypestepConfig } from 'typestep'

export default {
  fullOutputErrors: true,
  ignoredFiles: {
    'src/components/ProfileForm.vue': ({ error }) => {
      return error.startsWith('Argument of type \'ZodObject<{ username: ZodString; email: ZodEmail; }, $strip>\' is not assignable to parameter of type \'ZodType<any, ZodTypeDef, any>\'.')
    },
    'src/views/Signin.vue': ({ error }) => {
      return error.startsWith('Argument of type \'ZodObject<{ email: ZodEmail; password: ZodString; }, $strip>\' is not assignable to parameter of type \'ZodType<any, ZodTypeDef, any>\'.')
    },
    'src/views/Signup.vue': ({ error }) => {
      return error.startsWith('Argument of type \'ZodObject<{ email: ZodEmail; password: ZodString; confirmPassword: ZodString; }, $strip>\' is not assignable to parameter of type \'ZodType<any, ZodTypeDef, any>\'.')
    },
  },
} satisfies TypestepConfig
