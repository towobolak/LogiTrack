import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { toast } from './components/ui/toast';

const LogisticsForm = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    senderAddress: '',
    receiverAddress: '',
    senderMobile: '',
    receiverMobile: '',
    senderEmail: '',
    receiverEmail: '',
    estimatedFee: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateEstimate = () => {
    const distance = Math.random() * 100;
    const fee = (distance * 2).toFixed(2);
    setFormData((prev) => ({
      ...prev,
      estimatedFee: fee,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.estimatedFee) {
      toast({
        title: 'Error',
        description: 'Please calculate delivery fee first',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save query
      const saveResponse = await fetch('/api/save-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedFee: parseFloat(formData.estimatedFee)
        }),
      });

      if (!saveResponse.ok) throw new Error('Failed to save query');

      // Send confirmation
      const emailResponse = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.senderEmail }),
      });

      if (!emailResponse.ok) throw new Error('Failed to send confirmation');

      toast({
        title: 'Success',
        description: 'Form submitted successfully. You will receive a confirmation email shortly.'
      });

      // Reset form
      setFormData({
        senderName: '',
        receiverName: '',
        senderAddress: '',
        receiverAddress: '',
        senderMobile: '',
        receiverMobile: '',
        senderEmail: '',
        receiverEmail: '',
        estimatedFee: '',
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while submitting the form',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold mb-4">Logistics Form</h1>

          <div className="mb-2">
            <label htmlFor="senderName" className="block mb-1">Sender's Full Name</label>
            <Input
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="receiverName" className="block mb-1">Receiver's Full Name</label>
            <Input
              id="receiverName"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="senderAddress" className="block mb-1">Sender's Address</label>
            <Textarea
              id="senderAddress"
              name="senderAddress"
              value={formData.senderAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="receiverAddress" className="block mb-1">Receiver's Address</label>
            <Textarea
              id="receiverAddress"
              name="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="senderMobile" className="block mb-1">Sender's Mobile Number</label>
            <Input
              id="senderMobile"
              name="senderMobile"
              type="tel"
              value={formData.senderMobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="receiverMobile" className="block mb-1">Receiver's Mobile Number</label>
            <Input
              id="receiverMobile"
              name="receiverMobile"
              type="tel"
              value={formData.receiverMobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="senderEmail" className="block mb-1">Sender's Email</label>
            <Input
              id="senderEmail"
              name="senderEmail"
              type="email"
              value={formData.senderEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="receiverEmail" className="block mb-1">Receiver's Email</label>
            <Input
              id="receiverEmail"
              name="receiverEmail"
              type="email"
              value={formData.receiverEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <Button 
              type="button" 
              onClick={calculateEstimate}
              className="mr-2"
            >
              Calculate Delivery Fee
            </Button>
            <span className="text-lg font-semibold">
              {formData.estimatedFee ? `$${formData.estimatedFee}` : ''}
            </span>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LogisticsForm;