import {
  Flex,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Loading } from "../components";

import { AppInput, useCreateAppMutation } from "../graphql";

type Inputs = {
  name: string;
  image: string;
};

export function NewApp() {
  const navigate = useNavigate();
  const { mutate, isError, isSuccess, isLoading } = useCreateAppMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppInput>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<AppInput> = (data) => {
    mutate({ app: data });
  };

  if (isSuccess) navigate("/apps");

  return (
    <Flex
      width={"100%"}
      height={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack height={"100%"} width={"100%"} spacing={8} mx={"auto"}>
        <Box
          height={"100%"}
          width={"100%"}
          rounded={"lg"}
          bg={useColorModeValue("gray.200", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormControl
                id="firstName"
                isRequired
                isInvalid={errors.name ? true : false}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name && (
                  <FormErrorMessage>
                    Application name is required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="image"
                isRequired
                isInvalid={errors.image ? true : false}
              >
                <FormLabel>Image</FormLabel>
                <Input
                  type="text"
                  {...register("image", {
                    required: true,
                  })}
                />
                {errors.image && (
                  <FormErrorMessage>
                    Docker image name is required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="targetPorts">
                <FormLabel>Target ports</FormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl id="publishPorts">
                <FormLabel>Publish ports</FormLabel>
                <Input type="text" />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  colorScheme={"purple"}
                  type={"submit"}
                >
                  Deploy app
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
      {isLoading && <Loading />}
    </Flex>
  );
}
