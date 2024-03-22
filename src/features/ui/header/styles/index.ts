export const styles = {
    checkbox: { 
        mr: 2, 
        color: 'white',
        display: { sm: 'none' }, 
        '&.Mui-checked': {
            color: 'white',
            '& + .checkbox-box': {
                opacity: 1,
                transform: 'scale(1)'
            }
        } 
    },
    box: {
        zIndex: 2,
        backdropFilter: 'blur(3px)',
        '@media (max-width: 600px)': {
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 60,
            right: 0,
            background: '#00000063',
            opacity: 0,
            transition: 'opacity 600ms',
            transform: 'scale(0)',
        },
        '&.checked': {
            opacity: 1,
            transform: 'scale(1)'
          }
    }
}