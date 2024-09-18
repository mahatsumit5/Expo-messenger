import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Inputfield from "@/components/Inputfield";
import Icons from "@/constants/Icons";
import { Link, router } from "expo-router";
import { useLoginMutation } from "../../redux/index";
import { ErrorAlert } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/lib/useColorScheme";
import { H2 } from "@/components/ui/typography";
const SignIn = () => {
  const { toggleColorScheme } = useColorScheme();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "mahatsumit5@gmail.com",
    password: "Smith0987@",
  });

  const handleSubmit = async () => {
    try {
      await login(form).unwrap();
      router.replace("/(tabs)/home");
    } catch (error) {
      ErrorAlert(error);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" className="lg:w-[570px] mx-auto">
      <View className="bg-background h-full  justify-center  ">
        <View className="px-4 my-6 w-full justify-center mx-auto">
          <Image
            source={Icons.icon}
            resizeMode="contain"
            className="w-12 h-20"
          />

          <H2>Login</H2>
          <Inputfield
            placeholder="Enter your email"
            title="Email"
            keyboardType="email-address"
            onChange={(e) => setForm({ ...form, email: e })}
            value={form.email}
          />
          <Inputfield
            placeholder="Enter your password"
            title="Password"
            keyboardType="visible-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e })}
          />
          {/* <CustomButton
            isLoading={isLoading}
            onPress={handleSubmit}
            title="Log in"
          /> */}
          <Button
            className="mt-5 bg-primary flex flex-row"
            onPress={handleSubmit}
            disabled={isLoading}
            variant={"default"}
          >
            <Text className="text-primary-foreground text-lg">
              {isLoading ? "Please wait..." : "Log in"}
            </Text>
            {isLoading && (
              <ActivityIndicator
                animating={isLoading}
                color="#fff"
                size="small"
                className="ml-2"
              />
            )}
          </Button>
          <View className="justify-center gap-2 flex-row pt-5">
            <Text className="text-lg  font-pregular text-foreground">
              Dont have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary-100 text-foreground"
            >
              Sign up
            </Link>
          </View>
        </View>
        <Button
          variant={"ghost"}
          onPress={() => {
            toggleColorScheme();
          }}
        >
          <Text className="text-foreground">change</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
