import { object, string } from "yup";

export const userRegistrationSchema = object({
  fullName: string()
    .required("Полное имя обязательно")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Полное имя должно содержать только буквы и пробелы.",
    ),
  email: string()
    .required("Адрес электронной почты обязательный")
    .email("Неверный формат электронной почты"),
  password: string()
    .required("Пароль обязательный")
    .min(8, "Пароль должен быть длиной не менее 8 символов")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .matches(
      /[@$!%*?&]/,
      "Пароль должен содержать хотя бы один специальный символ",
    ),
  dob: string().required("ДР обязательно"),
});

export const userLoginSchema = object({
  email: string()
    .required("Адрес электронной почты обязательный")
    .email("Неверный формат электронной почты"),
  password: string()
    .required("Пароль обязательный")
    .min(8, "Пароль должен быть длиной не менее 8 символов")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .matches(
      /[@$!%*?&]/,
      "Пароль должен содержать хотя бы один специальный символ",
    ),
});

export const userEditSchema = object({
  fullName: string()
    .required("Полное имя обязательно")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Полное имя должно содержать только буквы и пробелы.",
    ),
  email: string()
    .required("Адрес электронной почты обязательный")
    .email("Неверный формат электронной почты"),
  dob: string().required("ДР обязательно"),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};
