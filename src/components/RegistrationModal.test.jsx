import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationModal from './RegistrationModal';
import { ModalContext } from '../context/ModalContext';
import * as formServices from '../services/formSubmission';

// Mock the form submission service
vi.mock('../services/formSubmission', () => ({
    submitRegistration: vi.fn()
}));

const mockCloseModal = vi.fn();

const renderWithContext = (contextValue = {}, props = {}) => {
    return render(
        <ModalContext.Provider value={{
            isModalOpen: true,
            modalContent: {},
            closeModal: mockCloseModal,
            ...contextValue
        }}>
            <RegistrationModal {...props} />
        </ModalContext.Provider>
    );
};

describe('RegistrationModal', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders nothing when isModalOpen is false', () => {
        render(
            <ModalContext.Provider value={{ isModalOpen: false, modalContent: null, closeModal: mockCloseModal }}>
                <RegistrationModal />
            </ModalContext.Provider>
        );
        expect(screen.queryByText(/Đăng ký nhận thông tin/i)).not.toBeInTheDocument();
    });

    it('renders form when open', () => {
        renderWithContext();
        expect(screen.getByText(/Đăng ký nhận thông tin/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Họ và tên/i)).toBeInTheDocument();
    });

    it('pre-fills project info if provided', () => {
        const project = { name: 'Test Project', province: 'ha-noi' };
        renderWithContext({ modalContent: { project } });

        expect(screen.getByText(project.name)).toBeInTheDocument();
        // Check if value is updated (might need to check display value indirectly unless controlled)
        // Since we can't easily check internal state, we can check if the province select is NOT present (logic in component)
        expect(screen.queryByLabelText(/Tỉnh thành quan tâm/i)).not.toBeInTheDocument();
    });

    it('submits form successfully', async () => {
        vi.spyOn(formServices, 'submitRegistration').mockResolvedValueOnce({ success: true });

        renderWithContext();

        fireEvent.change(screen.getByLabelText(/Họ và tên/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Số điện thoại/i), { target: { value: '0912345678' } });
        fireEvent.change(screen.getByLabelText(/Tỉnh thành quan tâm/i), { target: { value: 'ha-noi' } });

        fireEvent.click(screen.getByRole('button', { name: /Gửi đăng ký/i }));

        await waitFor(() => {
            expect(formServices.submitRegistration).toHaveBeenCalledWith(expect.objectContaining({
                name: 'John Doe',
                phone: '0912345678',
                province: 'ha-noi'
            }));
            expect(screen.getByText(/Đăng ký thành công/i)).toBeInTheDocument();
        });
    });

    it('displays error message on submission failure', async () => {
        vi.spyOn(formServices, 'submitRegistration').mockRejectedValueOnce(new Error('Submission failed'));

        renderWithContext();

        fireEvent.change(screen.getByLabelText(/Họ và tên/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Số điện thoại/i), { target: { value: '0912345678' } });
        fireEvent.change(screen.getByLabelText(/Tỉnh thành quan tâm/i), { target: { value: 'ha-noi' } });

        fireEvent.click(screen.getByRole('button', { name: /Gửi đăng ký/i }));

        await waitFor(() => {
            expect(screen.getByText(/Submission failed/i)).toBeInTheDocument();
        });
    });
});
