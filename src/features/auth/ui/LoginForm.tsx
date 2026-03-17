"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { loginSchema, type LoginFormValues } from "../lib/schemas";
import { useLoginMutation } from "../api/authApi";
import { useAppDispatch } from "@/shared/store/hooks";
import { setToken } from "@/features/auth/model/authSlice";
import { getErrorMessage } from "@/shared/lib/errors/getErrorMessage";
import LogoIcon from "@/shared/assets/images/logo.svg?react";
import LockIcon from "@/shared/assets/images/lock.svg?react";
import UserIcon from "@/shared/assets/images/user.svg?react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/shared/ui/field";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { InputField } from "@/shared/ui/inputField";

export const LoginForm = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", remember: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginMutation({
        username: data.username,
        password: data.password,
        expiresInMins: 30,
      }).unwrap();

      dispatch(
        setToken({ token: response.accessToken, remember: data.remember }),
      );

      navigate("/");
    } catch (error: unknown) {
      form.setError("root", { message: getErrorMessage(error) });

      if (getErrorMessage(error) === "Invalid credentials") {
        form.setError("root", { message: "Не правильный логин или пароль" });
      }
    }
  };

  return (
    <div className="w-full sm:max-w-131.75 rounded-[40px] p-1.5 bg-white">
      <div className="w-full rounded-[34px] p-px bg-[linear-gradient(180deg,rgba(237,237,237,1)_20%,rgba(237,237,237,0)_100%)]">
        <Card className="w-full rounded-[33px] p-12 p-b-12 gap-7 flex flex-col items-center bg-[linear-gradient(180deg,rgba(35,35,35,0.03)_0%,rgba(35,35,35,0)_50%)] ring-0">
          <div className="w-13 h-13 rounded-fullw-[52px] shadow-[0_0_0_2px_#FFFFFF,0_12px_8px_rgba(0,0,0,0.03)] rounded-full ">
            <LogoIcon />
          </div>

          <CardHeader className="w-full flex flex-col items-center gap-3">
            <CardTitle className="text-[#232323] text-center text-[32px] sm:text-[40px] font-semibold leading-[110%] tracking-[0.6px]">
              Добро пожаловать!
            </CardTitle>
            <CardDescription className="text-[#E0E0E0] text-center text-[18px] font-medium leading-[150%]">
              Пожалуйста, авторизируйтесь
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5 w-full px-2">
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="flex flex-col gap-4 w-full">
                {/* Username */}
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="flex flex-col gap-1.5"
                    >
                      <FieldLabel
                        className="text-[#232323] text-[18px] font-medium leading-[150%] tracking-[-0.27px]"
                        htmlFor="username"
                      >
                        Логин
                      </FieldLabel>
                      <InputField
                        {...field}
                        id="username"
                        placeholder="Введите логин"
                        disabled={isLoading}
                        autoComplete="username"
                        clearable
                        leftIcon={<UserIcon />}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-[18px] font-500 leading-[150%]"
                        htmlFor="password"
                      >
                        Пароль
                      </FieldLabel>
                      <InputField
                        {...field}
                        type="password"
                        id="password"
                        placeholder="Введите пароль"
                        disabled={isLoading}
                        autoComplete="current-password"
                        leftIcon={<LockIcon />}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Remember me */}
                <Controller
                  name="remember"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        id="remember"
                        className="cursor-pointer"
                      />
                      <Label htmlFor="remember" className="select-none">
                        Запомнить меня
                      </Label>
                    </div>
                  )}
                />

                {/* Root error */}
                {form.formState.errors.root && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.root.message}
                  </p>
                )}
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              form="login-form"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
