import CustomButton from "@/components/CutomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View>
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
        </View>
        <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
          Create Your Account
        </Text>
      </View>
      <View className="p-5">
        <InputField
          label="Name"
          placeholder="Enter name"
          icon={icons.person}
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
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
      <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

      <OAuth />

      <Link
        href="/signin"
        className="mt-10 text-center text-lg text-general-200"
      >
        <Text>Already have an account? </Text>
        <Text className="text-primary-500">Log in</Text>
      </Link>
    </ScrollView>
  );
};

export default Signup;
