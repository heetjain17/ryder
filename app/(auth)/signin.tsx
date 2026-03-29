import CustomButton from "@/components/CutomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useAuth, useSignIn } from "@clerk/expo";
import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const SignIn = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    // Attempt sign in with password
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
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
    } else if (signIn.status === "needs_second_factor") {
      // Handle multi-factor authentication if required
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code"
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
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
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  if (signIn?.status === "complete" || isSignedIn) {
    return null;
  }

  const isVerifying = signIn?.status === "needs_client_trust";

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
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors?.fields?.identifier && (
          <Text className="mt-1 text-sm text-red-500">
            {errors.fields.identifier.message}
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
        title="Sign In"
        onPress={handleSubmit}
        className="mt-6"
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      />

      <OAuth />

      <Link
        href="/signup"
        className="mt-10 text-center text-lg text-general-200"
      >
        <Text>Don&apos;t have an account? </Text>
        <Text className="text-primary-500">Sign up</Text>
      </Link>

      <ReactNativeModal isVisible={isVerifying}>
        <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
          <Text className="mb-2 font-JakartaExtraBold text-2xl">
            Verify your account
          </Text>
          <Text className="mb-5 font-Jakarta">
            Please enter your verification code.
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
            title="Verify"
            onPress={handleVerify}
            className="mt-5 bg-success-500"
            disabled={fetchStatus === "fetching"}
          />
          <CustomButton
            title="I need a new code"
            onPress={() => signIn?.mfa?.sendEmailCode()}
            className="mt-2 border border-neutral-300 bg-transparent"
          />
          <CustomButton
            title="Start over"
            onPress={() => signIn?.reset()}
            className="mt-2 bg-transparent"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignIn;
