import { VStack, Heading, Icon, useTheme, Box, Text } from "native-base";
import { Envelope, Key } from 'phosphor-react-native'
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { useToast } from 'native-base';


import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

import Logo from '../assets/logo_primary.svg';


export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const { colors } = useTheme();

    function handleSignIn(){
        if(!email || !password){
            return Alert.alert("Entrar", "Informe email e senha.");
        }

        setIsLoading(true);

        auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            console.log(response);
            
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email'){
                return toast.show({
                    placement: "top",
                    render: () => {
                      return <Box bg="danger.500" px="2" py="2" rounded="sm" mb={5}>
                              <Text color="white" fontSize="md" fontWeight="bold">E-mail inválido.</Text>  
                            </Box>;
                    }
                  });
                
            }

            if(error.code === 'auth/user-not-found'){
                 return toast.show({
                    placement: "top",
                    render: () => {
                      return <Box bg="danger.500" px="2" py="2" rounded="sm" mb={5}>
                              <Text color="white" fontSize="md" fontWeight="bold">E-mail ou senha inválido.</Text>  
                            </Box>;
                    }
                  });
            }

            if(error.code === 'auth/wrong-password'){
                return toast.show({
                    placement: "top",
                    render: () => {
                      return <Box bg="danger.500" px="2" py="2" rounded="sm" mb={5}>
                              <Text color="white" fontSize="md" fontWeight="bold">E-mail ou senha inválido.</Text>  
                            </Box>;
                    }
                  });
            }

            return toast.show({
                placement: "top",
                render: () => {
                  return <Box bg="danger.500" px="2" py="2" rounded="sm" mb={5}>
                          <Text color="white" fontSize="md" fontWeight="bold">Não foi possível acessar.</Text>  
                        </Box>;
                }
              });
            
        });
    }

    return(
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Heading color="gray.100" fontSize="xl" mt={6} mb={6}>
                    Acesse sua conta 
            </Heading>
            <Input 
                mb={4} 
                placeholder="E-mail"
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>}
                onChangeText={(text) => setEmail(text)}
            />
            <Input 
                mb={8}
                placeholder="Senha" 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>} 
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <Button 
                title="Entrar" 
                w="full" 
                onPress={handleSignIn}
                isLoading={isLoading}
            />
        </VStack>
    );
}