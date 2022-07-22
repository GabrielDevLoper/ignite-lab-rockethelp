import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateAccount } from '../screens/CreateAccount';
import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createNativeStackNavigator();

export function PublicRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='signIn' component={SignIn}/>
            <Screen name='createAccount' component={CreateAccount}/>
        </Navigator>
    );
}