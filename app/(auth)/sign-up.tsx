import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Inputfield from "@/components/Inputfield";
import Icons from "@/constants/Icons";
import { Link } from "expo-router";
import { useSignUpMutation } from "@/redux";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
  });

  const [signUp, { isLoading }] = useSignUpMutation();
  const handleSubmit = async () => {
    try {
      await signUp(form).unwrap();
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert("Success", errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className=" bg-background h-full  justify-start lg:w-[570px] mx-auto"
    >
      <View className="px-4 my-6 w-full justify-center mx-auto  pt-16">
        <Image source={Icons.icon} resizeMode="contain" className="w-12 h-20" />
        <Text className="text-2xl font-psemibold mt-5 text-foreground">
          Sign Up
        </Text>

        <Inputfield
          placeholder="Enter your first name"
          title="First Name"
          keyboardType="default"
          onChange={(e) => setForm({ ...form, fName: e })}
          value={form.fName}
        />
        <Inputfield
          placeholder="Enter your last name"
          title="Last Name"
          keyboardType="default"
          onChange={(e) => setForm({ ...form, lName: e })}
          value={form.lName}
        />
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
          onChange={(e) => setForm({ ...form, password: e })}
          value={form.password}
        />

        <Button
          className="mt-5 bg-primary"
          onPress={handleSubmit}
          disabled={isLoading}
          variant={"default"}
        >
          <P className="text-primary-foreground">Sign Up</P>
        </Button>
        <View className="justify-center gap-2 flex-row pt-5">
          <Text className="text-lg  font-pregular  text-foreground">
            Already have an account?
          </Text>
          <Link
            href={"/(auth)/sign-in"}
            className="text-lg font-psemibold text-secondary-foreground"
          >
            Sign In
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
