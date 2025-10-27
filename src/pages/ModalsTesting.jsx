// Simple usage
async function performSensitiveAction() {
  try {
    const result = await authnest.show2FAModal({
      title: 'Verify Your Identity',
      userContext: { userId: '123', action: 'delete_account' }
    });
    
    // If we get here, verification was successful
    proceedWithAction();
    
  } catch (error) {
    if (error.message === 'Modal cancelled by user') {
      showMessage('Verification cancelled');
    } else {
      showMessage('Verification failed: ' + error.message);
    }
  }
}

// Or with callbacks
authnest.showPasswordConfirmModal({
  title: 'Confirm Password',
  onSuccess: (data) => {
    updateUserProfile(data.user);
  },
  onCancel: () => {
    showMessage('Action cancelled');
  }
});