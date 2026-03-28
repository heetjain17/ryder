import CustomButton from "@/components/CutomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useAuth, useSignUp } from "@clerk/expo";
import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const Signup = () => {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    // Attempt sign up with password
    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
    }
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  if (signUp?.status === "complete" || isSignedIn) {
    return null;
  }

  const isVerifying =
    signUp?.status === "missing_requirements" &&
    signUp?.unverifiedFields.includes("email_address") &&
    signUp?.missingFields.length === 0;

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
          value={name}
          onChangeText={setName}
        />

        <InputField
          label="Email"
          placeholder="Enter email"
          icon={icons.email}
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors?.fields?.emailAddress && (
          <Text className="mt-1 text-sm text-red-500">
            {errors.fields.emailAddress.message}
          </Text>
        )}

        <InputField
          label="Password"
          placeholder="Enter password"
          icon={icons.lock}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors?.fields?.password && (
          <Text className="mt-1 text-sm text-red-500">
            {errors.fields.password.message}
          </Text>
        )}
      </View>

      <CustomButton
        title="Sign Up"
        onPress={handleSubmit}
        className="mt-6"
        // Example checking fetchStatus
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      />

      <OAuth />

      <Link
        href="/signin"
        className="mt-10 text-center text-lg text-general-200"
      >
        <Text>Already have an account? </Text>
        <Text className="text-primary-500">Log in</Text>
      </Link>

      <ReactNativeModal isVisible={isVerifying}>
        <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
          <Text className="mb-2 font-JakartaExtraBold text-2xl">
            Verify your account
          </Text>
          <Text className="mb-5 font-Jakarta">
            We've sent a verification code to {emailAddress}.
          </Text>
          <InputField
            label="Code"
            icon={icons.lock}
            placeholder="Enter your verification code"
            value={code}
            keyboardType="numeric"
            onChangeText={setCode}
          />
          {errors?.fields?.code && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.fields.code.message}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={handleVerify}
            className="mt-5 bg-success-500"
            disabled={fetchStatus === "fetching"}
          />
          <CustomButton
            title="I need a new code"
            onPress={() => signUp?.verifications.sendEmailCode()}
            className="mt-2 border border-neutral-300 bg-transparent"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default Signup;
