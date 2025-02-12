import '../gesture-handler.native';

import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Crear un cliente
const queryClient = new QueryClient();

export const PokedexApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <StackNavigator/>
            </ThemeContextProvider>
        </QueryClientProvider>
    )
}