import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../lib/schemas";
import { useLoginMutation } from "../api/authApi";
import { useAppDispatch } from "@/app/store/hooks";
import { setToken } from "../model/authSlice";
import { useNavigate } from "react-router";
import { getErrorMessage } from "@/shared/lib/errors/getErrorMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export const LoginForm = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginMutation({
        username: data.username,
        password: data.password,
      }).unwrap();

      dispatch(setToken({ token: response.token, remember: data.remember }));

      if (data.remember) {
        localStorage.setItem("token", response.token);
      } else {
        sessionStorage.setItem("token", response.token);
      }

      navigate("/");
    } catch (error: unknown) {
      setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Вход</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Имя пользователя"
              {...register("username")}
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Пароль"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" {...register("remember")} />
            <label htmlFor="remember">Запомнить меня</label>
          </div>

          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
