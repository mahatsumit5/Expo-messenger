import { View, Text, ScrollView, Image, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputfield from "@/components/Inputfield";
import CustomButton from "@/components/CustomButton";
import Icons from "@/constants/Icons";
import { Link, router } from "expo-router";
import { useLoginMutation, useGetLoggedInUserQuery } from "../../redux/index";
import { ErrorAlert } from "@/util";
import CustomStatusBar from "@/components/CustomStatusBAr";
const SignIn = () => {
  const [login, { isError, isLoading }] = useLoginMutation();

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
    <SafeAreaView className="bg-slate-100 h-full">
      <ScrollView>
        <View className="px-4 my-6 w-full justify-center mx-auto">
          <Image
            source={Icons.icon}
            resizeMode="contain"
            className="w-12 h-20"
          />
          <Text className="text-2xl font-psemibold mt-5">Login</Text>

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

          <CustomButton
            isLoading={isLoading}
            onPress={handleSubmit}
            title="Log in"
          />
          <View className="justify-center gap-2 flex-row pt-5">
            <Text className="text-lg  font-pregular ">
              Dont have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
      <CustomStatusBar style="dark" hidden={false} />
    </SafeAreaView>
  );
};

export default SignIn;
