// Sample data - replace with actual data from your API/state management
import { Cause } from '../types/cause';

export const sampleCauses: Cause[] = [
  {
    id: '1',
    title: 'Morning Prayer Circle',
    goal: 1000,
    currentJaaps: 756,
    achievingDate: new Date(),
    baaniName: 'Chaupai Sahib',
    members: ['Jaspreet', 'Amrit', 'Gurjot'],
  },
  {
    id: '2',
    title: 'Family Blessings',
    goal: 500,
    achievingDate: new Date(),
    currentJaaps: 243,
    baaniName: 'Japji Sahib',
    members: ['Harjeet', 'Simran', 'Sukhwinder'],
  },
  {
    id: '3',
    title: 'Community Seva',
    achievingDate: new Date(),
    baaniName: 'Anand Sahib',
    goal: 2000,
    currentJaaps: 1258,
    members: ['Gurpreet', 'Manpreet', 'Rajveer', 'Kiranjeet'],
  },
  {
    id: '4',
    title: 'Healing Prayers',
    achievingDate: new Date(),
    baaniName: 'Rehraas Sahib',
    goal: 700,
    currentJaaps: 412,
    members: ['Harpreet', 'Jasmine', 'Parminder'],
  },
  {
    id: '5',
    achievingDate: new Date(),
    title: 'Gratitude Circle',
    baaniName: 'Chaupai Sahib',
    goal: 365,
    currentJaaps: 189,
    members: ['Inderjeet', 'Navjot', 'Manjeet'],
  },
];