import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { Account } from "navigation/account";
import { Auth } from "navigation/auth";
import { Plan } from "navigation/plan";
import { PlanSetUp } from "navigation/plan-set-up";
import { RootStackScreens } from "types";

const Stack = createNativeStackNavigator<RootStackScreens>();

type Props = { session: Session | null };

const AllScreensStack = (props: Props) => {
  //const { session } = props;
  //const initialRouteName = session && session.user ? "Plan" : "Auth";

  return (
    <Stack.Navigator initialRouteName={"Plan"}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Plan" component={Plan} />
      <Stack.Screen name="PlanSetUp" component={PlanSetUp} />
    </Stack.Navigator>
  )
}

export default AllScreensStack;