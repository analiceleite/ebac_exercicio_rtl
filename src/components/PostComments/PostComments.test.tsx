import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PostComment from './index'; // Ajuste o caminho conforme a localização do arquivo

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment />);
        expect(screen.getByTestId('comment-button')).toBeInTheDocument();
        expect(screen.getByTestId('comment-textarea')).toBeInTheDocument();
    });

    it('Deve adicionar dois comentários e exibi-los na lista', async () => {
        render(<PostComment />);

        // Adicionar o primeiro comentário
        fireEvent.change(screen.getByTestId('comment-textarea'), {
            target: { value: 'Comentário adicionado via testes' }
        });
        fireEvent.click(screen.getByTestId('comment-button'));

        // Adicionar o segundo comentário
        fireEvent.change(screen.getByTestId('comment-textarea'), {
            target: { value: 'Segundo comentário adicionado via testes' }
        });
        fireEvent.click(screen.getByTestId('comment-button'));

        // Esperar e verificar se dois comentários foram adicionados
        await waitFor(() => {
            const commentItems = screen.getAllByTestId('comment-element');
            expect(commentItems).toHaveLength(2); // Verifica se exatamente dois comentários foram adicionados
        });

        // Verificar o conteúdo dos comentários
        expect(screen.getByText('Comentário adicionado via testes')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário adicionado via testes')).toBeInTheDocument();
    });
});
