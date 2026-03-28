import CustomButton from "@/components/CutomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("./(auth)/signup");
        }}
        className="flex w-full items-end justify-end p-5"
      >
        <Text className="text-md font-JakartaBold text-black">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#E2E8F0]" />
        }
        activeDot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#0286FF]" />
        }
        onIndexChanged={(activeIndex) => setActiveIndex(activeIndex)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />
            <View>
              <Text className="mx-10 text-center text-3xl font-bold text-black">
                {item.title}
              </Text>
            </View>
            <Text className="text-md mx-10 mt-10 text-center font-JakartaSemiBold text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() => {
          if (isLastSlide) {
            router.replace("./signup");
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
        className={`m-10 w-11/12`}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
