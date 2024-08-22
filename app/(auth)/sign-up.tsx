import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputfield from "@/components/Inputfield";
import CustomButton from "@/components/CustomButton";
import Icons from "@/constants/Icons";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = () => {
    Alert.alert("test", `${form.email}-${form.password}`);
    setLoading(true);
    try {
      // todo call api do your thingy
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert("Success", errorMessage);
    } finally {
      setLoading(false);
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
          <Text className="text-2xl font-psemibold mt-5">Sign Up</Text>

          <View className="flex flex-row gap-5 mx-auto w-full">
            <Inputfield
              placeholder="Enter your first name"
              title="First Name"
              keyboardType="default"
              onChange={(e) => setForm({ ...form, fName: e })}
            />
            <Inputfield
              placeholder="Enter your last name"
              title="Last Name"
              keyboardType="default"
              onChange={(e) => setForm({ ...form, lName: e })}
              otherFields=" ml-2 "
            />
          </View>
          <Inputfield
            placeholder="Enter your email"
            title="Email"
            keyboardType="email-address"
            onChange={(e) => setForm({ ...form, email: e })}
          />
          <Inputfield
            placeholder="Enter your password"
            title="Password"
            keyboardType="visible-password"
            onChange={(e) => setForm({ ...form, password: e })}
          />

          <CustomButton
            isLoading={false}
            onPress={handleSubmit}
            title="Log in"
          />
          <View className="justify-center gap-2 flex-row pt-5">
            <Text className="text-lg  font-pregular ">
              Already have an account?
            </Text>
            <Link
              href={"/(auth)/sign-in"}
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
