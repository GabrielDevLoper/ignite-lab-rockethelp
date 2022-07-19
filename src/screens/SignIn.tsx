import { VStack, Heading, Icon, useTheme } from "native-base";
import Logo from '../assets/logo_primary.svg';
import { Envelope, Key } from 'phosphor-react-native'

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    function handleSignIn(){
        console.log(email);
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
            <Button title="Entrar" w="full" onPress={handleSignIn}/>
        </VStack>
    );
}