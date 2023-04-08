import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/navigation/route';
import {LogBox} from 'react-native';
import AuthProvider from './src/context/AuthContext';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
