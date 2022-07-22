import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { VStack, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { IOrder } from '../components/Order';
import { dateFormat } from '../utils/fireStoreDateFormat';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { Loading } from '../components/Loading';

interface RouteParams {
  orderId: string;
}

interface OrderDetails extends IOrder {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();

  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc) => {
      const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

      const closed = closed_at ? dateFormat(closed_at) : null;

      setOrder({
        id: doc.id,
        patrimony,
        description,
        closed,
        status,
        solution,
        when: created_at ? dateFormat(created_at) : null
      });

      setIsLoading(false);
    });

  }, []);

  if(isLoading){
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700" >
        <Header title='Solicitação'/>
        <Text color="white">{orderId}</Text>
    </VStack>
  );
}