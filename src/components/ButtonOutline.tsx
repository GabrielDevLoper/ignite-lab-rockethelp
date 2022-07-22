import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

interface ButtonProps extends IButtonProps{
    title: string;
}

export function ButtonOutline({title, ...props}: ButtonProps) {
  return (
    <NativeBaseButton 
        variant="outline"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{
            bg: "green.500"
        }}
        borderColor="green.700"
        {...props}
    >
        <Heading color="green.700" fontSize="md">
            {title}
        </Heading>
    </NativeBaseButton>

    
  );
}