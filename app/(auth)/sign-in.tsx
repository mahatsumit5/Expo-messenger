import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputfield from "@/components/Inputfield";
import CustomButton from "@/components/CustomButton";
import Icons from "@/constants/Icons";
import { Link } from "expo-router";
import { useLoginMutation, useGetLoggedInUserQuery } from "../../redux/index";
const SignIn = () => {
  const [login, { isError, isLoading }] = useLoginMutation();
  const [form, setForm] = useState({
    email: "mahatsumit5@gmail.com",
    password: "Smith@0987",
  });

  const handleSubmit = async () => {
    try {
      await login(form).unwrap();
    } catch (error) {
      console.log(error);
      const errorMessage = (error as Error).message;
      Alert.alert("error", errorMessage);
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
    </SafeAreaView>
  );
};

export default SignIn;
