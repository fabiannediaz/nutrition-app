import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';
import { NavigationContainer, } from '@react-navigation/native';
import { AllScreensStack } from 'navigation/all-screens-stack';

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  // const Stack = createNativeStackNavigator<RootStackParamsList>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    });
  }, []);

  // const AuthScreen = () => <Auth />;
  // const PlanScreen = () => session && session.user ? <Plan key={session.user.id} session={session} /> : <Auth />;
  // const PlanSetUpScreen = () => <PlanSetUp />;
  // const AccountScreen = () => session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />;

  // const routes: ComponentProps<typeof Stack.Screen>[] = [
  //   {
  //     name: "Auth",
  //     component: AuthScreen,
  //     options: { title: 'Authentication' }
  //   },
  //   {
  //     name: "Plan",
  //     component: PlanScreen,
  //   },
  //   {
  //     name: "PlanSetUp",
  //     component: PlanSetUpScreen,
  //   },
  //   {
  //     name: "Account",
  //     component: AccountScreen,
  //   },
  // ];

  return (
    <NavigationContainer>
      <AllScreensStack session={session} />
    </NavigationContainer>
  )
}