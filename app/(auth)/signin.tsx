import CustomButton from "@/components/CutomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View>
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
        </View>
        <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
          Welcome Back
        </Text>
      </View>
      <View className="p-5">
        <InputField
          label="Email"
          placeholder="Enter email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          placeholder="Enter password"
          icon={icons.lock}
          secureTextEntry
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
      </View>
      <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

      <OAuth />

      <Link
        href="/signup"
        className="mt-10 text-center text-lg text-general-200"
      >
        <Text>Don't have an account? </Text>
        <Text className="text-primary-500">Sign up</Text>
      </Link>
    </ScrollView>
  );
};

export default SignIn;
