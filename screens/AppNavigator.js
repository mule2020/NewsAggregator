import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsCategoriesScreen from './NewsCategoriesScreen';
import NewsScreen from './NewsScreen';
import NewsDetailScreen from './NewsDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Categories">
                <Stack.Screen name="Categories" component={NewsCategoriesScreen} />
                <Stack.Screen name="News" component={NewsScreen} />
                <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
