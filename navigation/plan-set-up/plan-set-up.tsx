import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { RootStackScreens } from "types";
import { supabase } from "utils/supabase";

type Props = NativeStackScreenProps<RootStackScreens, "PlanSetUp">;

const PlanSetUp = (props: Props) => {
  const { navigation, route } = props;
  const { totalKcal, totalProtein, totalCarbo, totalFat } = route.params;

  const [kcal, setKcal] = useState(totalKcal);
  const [proteins, setProteins] = useState(totalProtein);
  const [carbs, setCarbos] = useState(totalCarbo);
  const [fats, setFats] = useState(totalFat);
  const [session, setSession] = useState<Session | null>(null);
  const [isValidChange, setIsValidChange] = useState<boolean>(true);

  const validateRemainingKcal = () => {
    const usedKcal = parseFloat(proteins) + parseFloat(carbs) + parseFloat(fats);
    if (usedKcal > parseFloat(kcal)) {
      setIsValidChange(false);
    }
    else if (usedKcal < parseFloat(kcal)) {
      setIsValidChange(false);
    }
    else {
      setIsValidChange(true);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    validateRemainingKcal();
  }, []);

  const [loading, setLoading] = useState(true);

  const updatePlan = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const values = {
        profile_id: session?.user.id,
        totalprotein: parseFloat(proteins),
        totalcarbo: parseFloat(carbs),
        totalfat: parseFloat(fats),
      }

      const { error } = await supabase.from('plan').upsert(values, { onConflict: 'profile_id' });

      if (error) {
        throw error;
      }

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      navigation.navigate("Plan");
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Kcal Totales"
          value={kcal}
          inputMode="decimal"
          onChangeText={(text) => setKcal(text)}
          onBlur={() => validateRemainingKcal()}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Input
          label="Proteínas"
          value={proteins}
          inputMode="decimal"
          onChangeText={(text) => setProteins(text)}
          onBlur={() => validateRemainingKcal()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Carbohidratos"
          value={carbs}
          inputMode="decimal"
          onChangeText={(text) => setCarbos(text)}
          onBlur={() => validateRemainingKcal()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Grasas"
          value={fats}
          inputMode="decimal"
          onChangeText={(text) => setFats(text)}
          onBlur={() => validateRemainingKcal()}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={'Guardar'}
          onPress={() => updatePlan()}
          disabled={!isValidChange}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})

export default PlanSetUp;