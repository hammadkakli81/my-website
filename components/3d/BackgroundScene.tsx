import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

const BackgroundScene = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            opacity: 0.5
        }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Sparkles count={100} scale={3} size={2} speed={0.4} opacity={0.5} color="#3b82f6" />
            </Canvas>
        </div>
    );
};

export default BackgroundScene;
