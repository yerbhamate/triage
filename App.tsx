import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { HomeScreen, HomeTab, ToolId } from './src/screens/HomeScreen';
import { FlagCheckScreen } from './src/screens/FlagCheckScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { MedicineGuideScreen } from './src/screens/MedicineGuideScreen';
import { ResourcesScreen } from './src/screens/ResourcesScreen';
import { FirstAidScreen } from './src/screens/FirstAidScreen';
import { BreathingScreen } from './src/screens/BreathingScreen';
import { GroundingScreen } from './src/screens/GroundingScreen';
import { CostsScreen } from './src/screens/CostsScreen';
import { SafetyPlanScreen } from './src/screens/SafetyPlanScreen';
import { VisitPrepScreen } from './src/screens/VisitPrepScreen';
import { evaluateTriage } from './src/utils/triageEngine';
import { SYMPTOMS, UrgencyLevel } from './src/data/triageData';
import { LanguageProvider } from './src/i18n/LanguageContext';

type Route =
  | { name: 'home' }
  | { name: 'flags'; symptomId: string }
  | { name: 'result'; symptomId: string; urgency: UrgencyLevel; checked: string[] }
  | { name: 'visitprep'; symptomId: string; urgency: UrgencyLevel; checked: string[] }
  | { name: 'history' }
  | { name: ToolId };

function AppInner() {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const [homeTab, setHomeTab] = useState<HomeTab>('physical');

  const goHome = () => setRoute({ name: 'home' });

  // Android hardware back button: from a result, go back to the home screen; never close mid-task.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (route.name === 'visitprep') {
        setRoute({ name: 'result', symptomId: route.symptomId, urgency: route.urgency, checked: route.checked });
        return true;
      }
      if (route.name !== 'home') {
        goHome();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [route]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      {route.name === 'home' && (
        <HomeScreen
          tab={homeTab}
          onTabChange={setHomeTab}
          onSelectSymptom={(symptomId) => setRoute({ name: 'flags', symptomId })}
          onOpenTool={(tool) => setRoute({ name: tool })}
          onOpenHistory={() => setRoute({ name: 'history' })}
        />
      )}
      {route.name === 'flags' && (
        <FlagCheckScreen
          symptomId={route.symptomId}
          onBack={goHome}
          onResult={(symptomId, checkedFlagIds) => {
            const symptom = SYMPTOMS.find((s) => s.id === symptomId)!;
            const urgency = evaluateTriage(symptom, checkedFlagIds);
            setRoute({ name: 'result', symptomId, urgency, checked: Array.from(checkedFlagIds) });
          }}
        />
      )}
      {route.name === 'result' && (
        <ResultScreen
          symptomId={route.symptomId}
          urgency={route.urgency}
          onDone={goHome}
          onOpenResources={() => setRoute({ name: 'resources' })}
          onPrepareVisit={() =>
            setRoute({ name: 'visitprep', symptomId: route.symptomId, urgency: route.urgency, checked: route.checked })
          }
          onOpenSafetyPlan={() => setRoute({ name: 'safetyplan' })}
        />
      )}
      {route.name === 'visitprep' && (
        <VisitPrepScreen
          symptomId={route.symptomId}
          urgency={route.urgency}
          checkedFlagIds={route.checked}
          onBack={() =>
            setRoute({ name: 'result', symptomId: route.symptomId, urgency: route.urgency, checked: route.checked })
          }
        />
      )}
      {route.name === 'history' && <HistoryScreen onBack={goHome} />}
      {route.name === 'medicine' && <MedicineGuideScreen onBack={goHome} />}
      {route.name === 'resources' && <ResourcesScreen onBack={goHome} />}
      {route.name === 'firstaid' && <FirstAidScreen onBack={goHome} />}
      {route.name === 'breathing' && <BreathingScreen onBack={goHome} />}
      {route.name === 'grounding' && <GroundingScreen onBack={goHome} />}
      {route.name === 'costs' && <CostsScreen onBack={goHome} />}
      {route.name === 'safetyplan' && <SafetyPlanScreen onBack={goHome} />}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
