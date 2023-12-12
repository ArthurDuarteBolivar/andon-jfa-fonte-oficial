package com.api.nodemcu.Services;


import com.api.nodemcu.model.NodemcuModel;
import com.api.nodemcu.model.OperationModel;
import com.api.nodemcu.repository.NodemcuRepository;
import com.api.nodemcu.repository.OperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class TimerService {

    @Autowired
    private NodemcuRepository repository;
    @Autowired
    private OperationRepository operationRepository;

    private AtomicInteger counter1 = new AtomicInteger(0);
    private AtomicInteger counter2 = new AtomicInteger(0);
    private AtomicInteger counter3 = new AtomicInteger(0);
    private AtomicInteger counter4 = new AtomicInteger(0);
    private AtomicInteger counter5 = new AtomicInteger(0);
    private AtomicInteger counter6 = new AtomicInteger(0);
    private AtomicInteger counter7 = new AtomicInteger(0);
    private AtomicInteger counter8 = new AtomicInteger(0);
    private AtomicInteger counter9 = new AtomicInteger(0);
    private AtomicInteger counter10 = new AtomicInteger(0);
    private AtomicInteger counter11 = new AtomicInteger(0);
    private AtomicInteger counter12 = new AtomicInteger(0);
    private AtomicInteger counter13 = new AtomicInteger(0);
    private AtomicInteger counter14 = new AtomicInteger(0);
    private AtomicInteger counter15 = new AtomicInteger(0);
    private AtomicInteger counter16 = new AtomicInteger(0);
    private Runnable timerTask1;
    private Runnable timerTask8;
    private Runnable timerTask2;
    private Runnable timerTask3;
    private Runnable timerTask4;
    private Runnable timerTask5;
    private Runnable timerTask6;
    private Runnable timerTask7;
    private Runnable timerTask9;
    private Runnable timerTask10;
    private Runnable timerTask11;
    private Runnable timerTask12;
    private Runnable timerTask13;
    private Runnable timerTask14;
    private Runnable timerTask15;
    private Runnable timerTask16;

    private ScheduledExecutorService scheduler1 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler2 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler3 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler4 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler5 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler6 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler7 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler8 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler9 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler10 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler11 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler12 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler13 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler14 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler15 = Executors.newScheduledThreadPool(1);
    private ScheduledExecutorService scheduler16 = Executors.newScheduledThreadPool(1);

    public void timerTask1() {
        OperationModel operation = operationRepository.findByName("010");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler1 = Executors.newScheduledThreadPool(1);
        timerTask1 = () -> {
            int newValue = counter1.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler1.scheduleAtFixedRate(timerTask1, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask2() {
        OperationModel operation = operationRepository.findByName("020");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler2 = Executors.newScheduledThreadPool(1);
        timerTask2 = () -> {
            int newValue = counter2.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler1.scheduleAtFixedRate(timerTask2, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask3() {
        OperationModel operation = operationRepository.findByName("030");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler3 = Executors.newScheduledThreadPool(1);
        timerTask3 = () -> {
            int newValue = counter3.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler3.scheduleAtFixedRate(timerTask3, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask4() {
        OperationModel operation = operationRepository.findByName("040");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler4 = Executors.newScheduledThreadPool(1);
        timerTask4 = () -> {
            int newValue = counter4.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler4.scheduleAtFixedRate(timerTask4, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask5() {
        OperationModel operation = operationRepository.findByName("050");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler5 = Executors.newScheduledThreadPool(1);
        timerTask5 = () -> {
            int newValue = counter5.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler5.scheduleAtFixedRate(timerTask5, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask6() {
        OperationModel operation = operationRepository.findByName("060");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler6 = Executors.newScheduledThreadPool(1);
        timerTask6 = () -> {
            int newValue = counter6.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler6.scheduleAtFixedRate(timerTask6, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask7() {
        OperationModel operation = operationRepository.findByName("070");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler7 = Executors.newScheduledThreadPool(1);
        timerTask7 = () -> {
            int newValue = counter7.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler7.scheduleAtFixedRate(timerTask7, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask8() {
        OperationModel operation = operationRepository.findByName("080");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler8 = Executors.newScheduledThreadPool(1);
        timerTask8 = () -> {
            int newValue = counter8.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler8.scheduleAtFixedRate(timerTask8, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask9() {
        OperationModel operation = operationRepository.findByName("090");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler9 = Executors.newScheduledThreadPool(1);
        timerTask9 = () -> {
            int newValue = counter9.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler9.scheduleAtFixedRate(timerTask9, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask10() {
        OperationModel operation = operationRepository.findByName("100");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler10 = Executors.newScheduledThreadPool(1);
        timerTask10 = () -> {
            int newValue = counter10.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler10.scheduleAtFixedRate(timerTask10, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask11() {
        OperationModel operation = operationRepository.findByName("110");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler11 = Executors.newScheduledThreadPool(1);
        timerTask11 = () -> {
            int newValue = counter11.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler11.scheduleAtFixedRate(timerTask11, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask12() {
        OperationModel operation = operationRepository.findByName("120");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler12 = Executors.newScheduledThreadPool(1);
        timerTask12 = () -> {
            int newValue = counter12.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler12.scheduleAtFixedRate(timerTask11, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask13() {
        OperationModel operation = operationRepository.findByName("130");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler13 = Executors.newScheduledThreadPool(1);
        timerTask13 = () -> {
            int newValue = counter13.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler13.scheduleAtFixedRate(timerTask13, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask14() {
        OperationModel operation = operationRepository.findByName("140");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler14 = Executors.newScheduledThreadPool(1);
        timerTask14 = () -> {
            int newValue = counter14.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler14.scheduleAtFixedRate(timerTask14, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask15() {
        OperationModel operation = operationRepository.findByName("150");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler15 = Executors.newScheduledThreadPool(1);
        timerTask15 = () -> {
            int newValue = counter15.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler15.scheduleAtFixedRate(timerTask15, 0, 1, TimeUnit.SECONDS);
    }

    public void timerTask16() {
        OperationModel operation = operationRepository.findByName("160");
        NodemcuModel device = repository.findByNameId(operation);
        scheduler16 = Executors.newScheduledThreadPool(1);
        timerTask16 = () -> {
            int newValue = counter16.incrementAndGet();
            device.setLocalTC(newValue);
            repository.save(device);
        };
        scheduler16.scheduleAtFixedRate(timerTask16, 0, 1, TimeUnit.SECONDS);
    }


    public void resetCounters(String name) {
        if ("010".equals(name)) {
            OperationModel operation = operationRepository.findByName("010");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler1.shutdown();
            counter1.set(0);
            device.setLocalTC(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("020".equals(name)) {
            OperationModel operation = operationRepository.findByName("020");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler2.shutdown();
            counter2.set(0);
            device.setLocalTC(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("030".equals(name)) {
            OperationModel operation = operationRepository.findByName("030");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler3.shutdown();
            counter3.set(0);
            device.setLocalTC(0);
            device.setLocalTC(0);
            repository.save(device);
        }
        if ("040".equals(name)) {
            OperationModel operation = operationRepository.findByName("040");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler4.shutdown();
            counter4.set(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("050".equals(name)) {
            OperationModel operation = operationRepository.findByName("050");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler5.shutdown();
            counter5.set(0);
            device.setLocalTC(0);
            repository.save(device);
        }

// Continue with the remaining conditional statements for "060" to "160" in a similar manner

        if ("060".equals(name)) {
            OperationModel operation = operationRepository.findByName("060");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler6.shutdown();
            counter6.set(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("070".equals(name)) {
            OperationModel operation = operationRepository.findByName("070");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler7.shutdown();
            counter7.set(0);
            device.setLocalTC(0);
            repository.save(device);
        }

// Continue with the remaining conditional statements for "080" to "160" in a similar manner

        if ("080".equals(name)) {
            OperationModel operation = operationRepository.findByName("080");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler8.shutdown();
            counter8.set(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("090".equals(name)) {
            OperationModel operation = operationRepository.findByName("090");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler9.shutdown();
            counter9.set(0);
            device.setLocalTC(0);
            repository.save(device);
        }


        if ("100".equals(name)) {
            OperationModel operation = operationRepository.findByName("100");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler10.shutdown();
            counter10.set(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("110".equals(name)) {
            OperationModel operation = operationRepository.findByName("110");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler11.shutdown();
            counter11.set(0);
            device.setLocalTC(0);
            repository.save(device);
        }



        if ("120".equals(name)) {
            OperationModel operation = operationRepository.findByName("120");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler12.shutdown();
            counter12.set(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("130".equals(name)) {
            OperationModel operation = operationRepository.findByName("130");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler13.shutdown();
            counter13.set(0);
            device.setLocalTC(0);
            repository.save(device);
        }


        if ("140".equals(name)) {
            OperationModel operation = operationRepository.findByName("140");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler14.shutdown();
            counter14.set(0);
            device.setLocalTC(0);
            repository.save(device);
        } else if ("150".equals(name)) {
            OperationModel operation = operationRepository.findByName("150");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler15.shutdown();
            counter15.set(0);
            device.setLocalTC(0);
            repository.save(device);
        }

// Continue with the remaining conditional statements for "160" in a similar manner

        if ("160".equals(name)) {
            OperationModel operation = operationRepository.findByName("160");
            NodemcuModel device = repository.findByNameId(operation);
            scheduler16.shutdown();
            counter16.set(0);
            device.setLocalTC(0);
            repository.save(device);
        }

    }
}



